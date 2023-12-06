package kosa.afnica.backend.api.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import io.swagger.v3.oas.annotations.Operation;
import kosa.afnica.backend.api.service.impl.MemberServiceImpl;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.member.MemberLoginReqDto;
import kosa.afnica.backend.db.dto.member.MemberLoginResDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class OauthController {
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
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(email, password);

        // AuthenticationManager 에 authToken 을 넘기면 UserDetailsService 가 받아 처리.
        // DB에서 사용자 정보와 일치하는지 검사해서 맞을 경우 인증된 생성자로 Authentication객체 생성(맞지 않을 경우 403 예외 발생)
        Authentication authentication = authenticationManager.authenticate(authToken);

        //Spring Security에 인증 객체를 등록
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //AccessToken 생성
        String accessToken = JwtUtil.createToken(email);
        String role = memberService.findRole(email);

        //FE로 보낼 DTO
        MemberLoginResDto memberLoginResDto = MemberLoginResDto.builder().email(email).role(role).accessToken(accessToken).build();

        return ResponseEntity.ok(memberLoginResDto);
    }

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;
    @Value("${spring.url.base-url}")
    private String baseUrl;

    @PostMapping("/oauth-login")
    public ResponseEntity<Map<String, Object>> handleGoogleLogin(@RequestParam("credential") String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory()).setAudience(Collections.singletonList(clientId)).build();
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                // 여기서부터 로직 구현
                GoogleIdToken.Payload payload = idToken.getPayload();

                // 필요한 정보 추출
                String email = payload.getEmail();

                // email 기반으로 가입된 유저인지 확인 : 로그인 or 회원가입
                int check = (memberService.existEmail(email) ? 0 : 1);

                // 리다이렉트를 위한 header 설정
                HttpHeaders headers = new HttpHeaders();

                if (check == 1) {
                    if (memberService.findRole(email) == null) {
                        String message = ErrorCode.INVALID_ACCOUNTS.getMessage();
                        String url = UriComponentsBuilder
                                .fromUriString(baseUrl + "/member/login-fail")
                                .queryParam("message", message)
                                .toUriString();
                        headers.setLocation(URI.create(url));
                    } else {
                        // 가입된 유저가 존재할 경우
                        // email, role, tokken 정보와 함께 login-succeess 화면으로 이동
                        String accessToken = JwtUtil.createToken(email);
                        String role = memberService.findRole(email);
                        String url = UriComponentsBuilder
                                .fromUriString(baseUrl + "/member/login-success")
                                .queryParam("email", email)
                                .queryParam("role", role)
                                .queryParam("accessToken", accessToken)
                                .toUriString();
                        headers.setLocation(URI.create(url));
                    }
                } else {
                    // 가입된 유저가 존재하지 않을 경우
                    // email 정보와 함께 회원가입 페이지로 리다이렉트
                    String url = UriComponentsBuilder
                            .fromUriString(baseUrl + "/member/signup")
                            .queryParam("email", email)
                            .toUriString();
                    headers.setLocation(URI.create(url));
                }

                return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
            } else {
                // 예외처리1. 구글에서 넘어온 token의 정보가 존재하지 않을 경우
                throw new CustomException(ErrorCode.INVALID_TOKEN);
            }
        } catch (Exception e) {
            // 예외처리2. 구글 서버 에러
            throw new CustomException(ErrorCode.GOOGLE_SERVER_ERROR);
        }
    }


    // 코큰해독
    //    @GetMapping("/brand")
    //    public ResponseEntity<List<BrandResDto>> getBrandList(HttpServletRequest servletRequest) {
    //        JwtUtil.getId(servletRequest.getHeader("Authencation"))
    //                .getEmail();}
}
