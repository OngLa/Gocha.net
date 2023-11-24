package kosa.afnica.backend.config.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private AccessDeniedHandler accessDeniedHandler;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //Authorization 헤더를 통한 인증 사용하지 않음
        http.httpBasic(config -> config.disable());

        //폼을 통한 인증 사용하지 않음
        http.formLogin(config -> config.disable());

        //CORS 설정
        http.cors(config -> corsConfigurationSource());

        //사이트간 요청 위조 방지 비활성화
        http.csrf(config -> config.disable());

        //서버 세션 비활성화
        http.sessionManagement(management -> management
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        //JWT 토큰 인증 필터 추가
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        //요청 경로별 권한 설정
        http.authorizeHttpRequests(customizer -> customizer

                //Chatting
                //공통
                .antMatchers(HttpMethod.GET, "/api/chatting/chatroom").hasAnyRole("CARCENTER", "USER")
                .antMatchers(HttpMethod.POST, "/api/chatting/sendmessage").hasAnyRole("CARCENTER", "USER")
                //carcenter
                .antMatchers(HttpMethod.GET, "/api/chatting/user").hasAuthority("ROLE_CARCENTER")
                //user
                .antMatchers("/api/chatting/**").hasAuthority("ROLE_USER")

                //Car
                .antMatchers("/api/cars/**").hasAuthority("ROLE_USER")

                //Car
                .antMatchers("/api/car-data/**").hasAuthority("ROLE_USER")

                //Fc & Reservation
                //공통
                .antMatchers(HttpMethod.GET, "/api/member/reservation/list").hasAnyRole("CARCENTER", "USER")
                .antMatchers(HttpMethod.DELETE, "/api/member/reservation/**").hasAnyRole("CARCENTER", "USER")
                //carcenter
                .antMatchers(HttpMethod.PUT, "/api/member/reservation/bookerlist").hasAuthority("ROLE_CARCENTER")
                .antMatchers(HttpMethod.GET, "/api/member/reservation/bookerlist").hasAuthority("ROLE_CARCENTER")
                //user
                .antMatchers("/api/member/reservation/**").hasAuthority("ROLE_USER")

                //Member
                .antMatchers(HttpMethod.GET, "/api/member/mypage").hasAnyRole("CARCENTER", "USER")

                //.antMatchers("/api/chatting/**").hasAuthority("ROLE_CARCENTER") // 전체(**)
                //.antMatchers(HttpMethod.GET, "/board/list").hasAuthority("ROLE_USER") //ROLE_생략하면 안됨
                //.antMatchers(HttpMethod.GET, "/api/member/reservation/list").hasAnyRole("CARCENTER", "USER") //ROLE_ 붙이면 안됨
                //.anyRequest().permitAll() //그 이외의 모든 경로 허가
        );

        return http.build();
    }

    @Bean
    RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl hierarchy = new RoleHierarchyImpl();
        hierarchy.setHierarchy("ROLE_ADMIN > ROLE_CARCENTER > ROLE_USER");
        return hierarchy;
    }


    //크로스 도메인 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        //모든 요청 사이트 허용
        configuration.addAllowedOrigin("*");
        //모든 요청 방식 허용
        configuration.addAllowedMethod("*");
        //모든 요청 헤더 허용
        configuration.addAllowedHeader("*");
        //요청 헤더의 Authorization를 이용해서 사용자 인증(로그인 처리)하지 않음
        configuration.setAllowCredentials(false);
        //모든 URL 요청에 대해서 위 내용을 적용
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    //비빌번호 인코더 설정
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    //인증 관리자 설정
    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}










