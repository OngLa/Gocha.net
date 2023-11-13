package kosa.afnica.backend.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class WebSecurityConfig {
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		//Authorization 헤더를 통한 인증 사용하지 않음
    	http.httpBasic(config -> config.disable());
    	
    	//폼을 통한 인증 사용하지 않음
    	http.formLogin(config -> config.disable());
    	
    	//CORS 설정
    	http.cors(config -> {});
    	
    	//사이트간 요청 위조 방지 비활성화
    	http.csrf(config -> config.disable());
    	
    	//서버 세션 비활성화
    	http.sessionManagement(management -> management
    			.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    	
    	//JWT 토큰 인증 필터 추가
    	http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    	
    	//요청 경로별 권한 설정
        http.authorizeHttpRequests(customizer -> customizer
        	//방법1
        	.antMatchers("/board/**").hasAuthority("ROLE_USER")
        	
        	//방법2
			//.antMatchers(HttpMethod.GET, "/board/list").hasAuthority("ROLE_USER") //ROLE_생략하면 안됨
			//.antMatchers(HttpMethod.POST, "/board/create").hasAnyRole("USER") //ROLE_ 붙이면 안됨
			//.antMatchers(HttpMethod.GET, "/board/read/*").hasAnyRole("USER")
			//.antMatchers(HttpMethod.PUT, "/board/update").hasAnyRole("USER")
			//.antMatchers(HttpMethod.DELETE, "/board/delete/*").hasAnyRole("USER")
			//.antMatchers(HttpMethod.POST, "/board/createWithAttach").hasAnyRole("USER")
			//.antMatchers(HttpMethod.GET, "/board/battach/*").hasAnyRole("USER")

        	
			//그 이외의 모든 경로 허가
			.anyRequest().permitAll()
		);
    	
        return http.build();
	}
	
	@Bean
	RoleHierarchy roleHierarchy() {
	    RoleHierarchyImpl hierarchy = new RoleHierarchyImpl();
	    hierarchy.setHierarchy("ROLE_ADMIN > ROLE_MANAGER > ROLE_USER");
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
	
	/*
	//비빌번호 인코더 설정
	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    */
	
	//인증 관리자 설정
	@Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}










