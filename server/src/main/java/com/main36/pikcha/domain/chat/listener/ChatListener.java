package com.main36.pikcha.domain.chat.listener;

import com.main36.pikcha.domain.chat.dto.ChatEntranceDto;
import com.main36.pikcha.domain.chat.entity.ChatMessage;
import com.main36.pikcha.domain.connection.entity.Connection;
import com.main36.pikcha.domain.connection.repository.ConnectionRepository;
import com.main36.pikcha.global.exception.BusinessLogicException;
import com.main36.pikcha.global.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Slf4j
@Component
@RequiredArgsConstructor
public class ChatListener {
    private final SimpMessageSendingOperations messagingTemplate;
    private final ConnectionRepository repository;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("EventListener : Received a new web socket connection");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        if(sessionId != null) {
            Connection connection = repository.findTopBySessionId(sessionId).orElseThrow( ()-> new BusinessLogicException(ExceptionCode.CONNECTION_NOT_FOUND));
            log.info("Disconnected User Id : " + connection.getMemberId());
            repository.delete(connection);
            log.info("Connection data has been deleted");
            messagingTemplate.convertAndSend("/topic/messages", new ChatEntranceDto(connection.getUsername(), connection.getMemberId(), ChatMessage.MessageType.LEAVE));
        }
    }
}
