package kosa.afnica.backend.config.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // 2xx
    ITEM_NOT_FOUND(HttpStatus.NO_CONTENT, "게시물이 없습니다"),

    // 4xx Client Errors
    BAD_REQUEST(HttpStatus.BAD_REQUEST, "Bad Request"),
    INVALID_ACCESS_TOKEN(HttpStatus.BAD_REQUEST, "액세스 토큰이 유효하지 않습니다"),
    MISMATCH_ACCESS_TOKEN(HttpStatus.BAD_REQUEST, "액세스 토큰의 유저 정보가 일치하지 않습니다"),
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "리프레시 토큰이 유효하지 않습니다"),
    MISMATCH_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "리프레시 토큰의 유저 정보가 일치하지 않습니다"),

    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "Unauthorized"),
    WRONG_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다"),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다."),

    FORBIDDEN(HttpStatus.FORBIDDEN, "Forbidden"),
    INVALID_ACCOUNTS(HttpStatus.FORBIDDEN, "존재하지 않는 계정입니다."), // 로그인 실패 시

    NOT_FOUND(HttpStatus.NOT_FOUND, "Not Found"),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 Email 입니다"),
    RESERVATIONS_NOT_FOUND(HttpStatus.NOT_FOUND, "예약 목록이 존재하지 않습니다."),
    CARDATA_NOT_FOUND(HttpStatus.NOT_FOUND, "데이터가 존재하지 않습니다."),

    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, "Method Not Allowed"),

    CONFLICT(HttpStatus.CONFLICT, "Conflict"),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "존재하는 Email 입니다"),
    DUPLICATE_NAME(HttpStatus.CONFLICT, "존재하는 Name 입니다"),
    DUPLICATE_USER(HttpStatus.CONFLICT, "존재하는 user 입니다"),

    // 5xx Server Errors
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error"),

    NOT_IMPLEMENTED(HttpStatus.NOT_IMPLEMENTED, "Not Implemented"),

    BAD_GATEWAY(HttpStatus.BAD_GATEWAY, "Bad Gateway");


    private final HttpStatus httpStatus;
    private final String message;
}
