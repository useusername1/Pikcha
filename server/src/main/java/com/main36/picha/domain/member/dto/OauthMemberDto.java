package com.main36.picha.domain.member.dto;

import com.main36.picha.domain.post.entity.Post;
import com.main36.picha.domain.save.entity.Save;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class OauthMemberDto {

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(name = "picture")
    private String picture;

}
