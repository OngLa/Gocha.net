package kosa.afnica.backend.api.controller;

import kosa.afnica.backend.api.service.impl.MemberServiceImpl;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.member.MemberLoginReqDto;
import kosa.afnica.backend.db.dto.member.MemberLoginResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final MemberServiceImpl memberService;

    @PostMapping("/login")
    public ResponseEntity<MemberLoginResDto> postLogin(@RequestBody MemberLoginReqDto memberLoginReqDto) {
//        log.info(memberLoginReqDto.toString());
        log.info("email = {}, password = {}", memberLoginReqDto.getEmail(), memberLoginReqDto.getPassword());
        //아이디와 패스워드 검증-------------------------------------
        //아이디와 비밀번호를 가지고 있는 객체 생성
        String email = memberLoginReqDto.getEmail();
        String password = memberLoginReqDto.getPassword();
        //UsernamePasswordAuthenticationToken : 아직 인증되지 않은 Authentication객체를 생성
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(email, password);

        // AuthenticationManager 에 token 을 넘기면 UserDetailsService 가 받아 처리하도록 한다.
        //DB에서 사용자 정보와 일치하는지 검사해서 맞을 경우 인증된 생성자로 Authentication객체 생성(맞지 않을 경우 403 예외 발생)
        Authentication authentication = authenticationManager.authenticate(authToken);

        //Spring Security에 인증 객체를 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //AccessToken 생성 ---------------------------------------
        String accessToken = JwtUtil.createToken(email);
        String role = memberService.findRole(email);
        MemberLoginResDto memberLoginResDto = MemberLoginResDto.builder()
                .email(email)
                .role(role)
                .accessToken(accessToken)
                .build();

        return ResponseEntity.ok(memberLoginResDto);
    }

    @GetMapping ("/test")
    public ResponseEntity<Void> postLogin() {


        return ResponseEntity.ok(null);
    }
}
