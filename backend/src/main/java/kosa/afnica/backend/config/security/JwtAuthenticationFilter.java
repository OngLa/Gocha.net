package kosa.afnica.backend.config.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

@Component
public class JwtAuthenticationFilter extends GenericFilterBean {
   @Autowired
   private UserDetailsService userDetailsService;

   @Override
   public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
         throws IOException, ServletException {
      //AccessToken 얻기
      String accessToken = null;
      HttpServletRequest httpServletRequest = (HttpServletRequest) request;
      //Authorization: Bearer token
      String authorizationHeader = httpServletRequest.getHeader("Authorization");
      if(authorizationHeader != null && authorizationHeader.contains("Bearer")) {
         // 헤더에 accessToken이 포함되어 있을 경우
         accessToken = authorizationHeader.substring(7);
      } else {
         // QueryString에 형태로 넘어왔을 경우
         // <img src="battach/3?accessToken=xxx">
         accessToken = request.getParameter("aceessToken");
    }         
      
      //유효한 토큰인지 확인
      if(accessToken != null && !accessToken.trim().equals("")) {
         if(JwtUtil.validateToken(accessToken)) {
            //토큰에서 userId 얻기
            String userId = JwtUtil.getUserId(accessToken);
            //DB에서 userId에 해당하는 정보를 가져오기
            UserDetails userDetails = userDetailsService.loadUserByUsername(userId);
            //인증 객체 생성
            Authentication authentication = new UsernamePasswordAuthenticationToken(userId, "", userDetails.getAuthorities());
            //Spring Security에 인증 객체 등록
            SecurityContextHolder.getContext().setAuthentication(authentication);
         }
      }
      
      chain.doFilter(request, response);
   }
}











