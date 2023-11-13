package kosa.afnica.backend.api.controller;

import java.util.HashMap;
import java.util.Map;

import kosa.afnica.backend.config.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private AuthenticationManager autenticationManager;

    @PostMapping("/api/auth/login")
    public Map<String, String> userLogin(@RequestBody Map<String, String> user) {
        log.info(user.toString());
        //아이디와 패스워드 검증-------------------------------------
        //아이디와 비밀번호를 가지고 있는 객체 생성
        String id = user.get("id");
        String password = user.get("password");
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(id, password);
        //DB에서 사용자 정보와 일치하는지 검사해서
        //맞을 경우 Authentication 객체 리턴
        //맞지 않을 경우 403 예외 발생
        Authentication authentication = autenticationManager.authenticate(authToken);
        //Spring Security에 인증 객체를 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);


        //AccessToken 생성 ---------------------------------------
        String accessToken = JwtUtil.createToken(id);

        //JSON 응답 생성
        //{"user": "xxxxx", "accessToken": "yyyyy" }
        Map<String, String> map = new HashMap<>();
        map.put("user", id);
        map.put("accessToken", accessToken);

        return map;
    }
}
