package com.main36.pikcha.domain.chat.entity;

import com.main36.pikcha.global.audit.Auditable;
import lombok.*;

import javax.persistence.Entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@NoArgsConstructor
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
public class ChatMessage extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatId;
    private Long memberId;
    private Long targetId;
    private String targetContent;
    private String targetPicture;
    private String targetUsername;
    private String picture;
    private String username;
    private MessageType type;
    private String content;
    private String verifyKey;
    public enum MessageType {
        JOIN, LEAVE, CHAT, REPLY, DELETE, ERROR
    } // 삭제 상태 추가
}
