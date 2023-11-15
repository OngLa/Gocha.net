package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import kosa.afnica.backend.api.service.impl.MemberServiceImpl;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.member.MemberLoginReqDto;
import kosa.afnica.backend.db.dto.member.MemberLoginResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final MemberServiceImpl memberService;

    @Operation(summary = "Login API", description = "로그인 페이지에서 Email, PW 받아 Email, Role, Token 생성 및 localstorage 등록 & 헤더에 token 등록")
    @PostMapping("/login")
    public ResponseEntity<MemberLoginResDto> postLogin(@RequestBody MemberLoginReqDto memberLoginReqDto) {
        // 로그인 페이지로부터 입력받은 값을 console로 확인
        log.info("[Login Input] email = {}, password = {}", memberLoginReqDto.getEmail(), memberLoginReqDto.getPassword());

        String email = memberLoginReqDto.getEmail();
        String password = memberLoginReqDto.getPassword();

        // 아이디와 패스워드 검증을 위해 아직 인증되지 않은 (아이디와 비밀번호를 가지고 있는) Authentication객체를 생성
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(email, password);

        // AuthenticationManager 에 authToken 을 넘기면 UserDetailsService 가 받아 처리.
        // DB에서 사용자 정보와 일치하는지 검사해서 맞을 경우 인증된 생성자로 Authentication객체 생성(맞지 않을 경우 403 예외 발생)
        Authentication authentication = authenticationManager.authenticate(authToken);

        //Spring Security에 인증 객체를 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //AccessToken 생성
        String accessToken = JwtUtil.createToken(email);
        String role = memberService.findRole(email);

        //FE로 보낼 DTO
        MemberLoginResDto memberLoginResDto = MemberLoginResDto.builder()
                .email(email)
                .role(role)
                .accessToken(accessToken)
                .build();

        return ResponseEntity.ok(memberLoginResDto);
    }

    // 코큰해독
    //    @GetMapping("/brand")
    //    public ResponseEntity<List<BrandResDto>> getBrandList(HttpServletRequest servletRequest) {
    //        JwtUtil.getId(servletRequest.getHeader("Authencation"))
    //                .getEmail();}
}
