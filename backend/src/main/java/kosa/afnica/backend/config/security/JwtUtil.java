package kosa.afnica.backend.config.security;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtil {
	
	//비밀키(누출되면 안됨)
    private static final String secretKey = "secret";

    // JWT 토큰 생성: 사용자 아이디 포함
    public static String createToken(String userId) {
		String token = null;
		try {
			JwtBuilder builder = Jwts.builder();
			builder.setHeaderParam("typ", "JWT"); //토큰의 종류
			builder.setHeaderParam("alg", "HS256"); //암호화 알고리즘 종류
			builder.setExpiration(new Date(new Date().getTime() + 1000*60*60*12)); //토큰의 유효기간
			builder.claim("userId", userId); //토큰에 저장되는 데이터
			builder.signWith(SignatureAlgorithm.HS256, secretKey.getBytes("UTF-8")); //비밀키
			token = builder.compact(); //모든 내용을 묶기
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return token;
    }
    
    //JWT 토큰에서 모든 내용(Claims) 얻기
    public static Claims getClaims(String token) {
    	Claims claims = null;
		try {
			JwtParser parser = Jwts.parser();
			parser.setSigningKey(secretKey.getBytes("UTF-8"));
			Jws<Claims> jws = parser.parseClaimsJws(token);
			claims = jws.getBody();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return claims;
    }

	//JWT 토큰에서 사용자 아이디 얻기
	//Token 풀어줘서 eamil 얻고 이걸 가지고 id 조회하여 리턴하기
	public static String getEmail(String token) {
		String email = null;
		try {
			JwtParser parser = Jwts.parser();
			parser.setSigningKey(secretKey.getBytes("UTF-8"));
			Jws<Claims> jws = parser.parseClaimsJws(token);
			Claims claims = jws.getBody();
			email = claims.get("userId", String.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return email;
	}
	
	//JWT 토큰 유효성 검사: 만료일자 확인 
	public static boolean validateToken(String token) {
		boolean validate = false;
		try {
			JwtParser parser = Jwts.parser();
			parser.setSigningKey(secretKey.getBytes("UTF-8"));
			Jws<Claims> jws = parser.parseClaimsJws(token);
			Claims claims = jws.getBody();
			validate = !claims.getExpiration().before(new Date());
			/*if(validate) {
				long remainMillSecs = claims.getExpiration().getTime() - new Date().getTime();
				logger.info("" + remainMillSecs/1000 + "초 남았음");
			}*/
		} catch (Exception e) {
			e.printStackTrace();
		}
		return validate;
	}


	
	//테스트
	/*public static void main(String[] args) {
		//토큰 생성
		String jwt = createToken("user1");
		log.info(jwt);
		
		//토큰 정보 얻기
		if(validateToken(jwt)) {
			String uid = getId(jwt);
			log.info(uid);
		}
	}*/
}

