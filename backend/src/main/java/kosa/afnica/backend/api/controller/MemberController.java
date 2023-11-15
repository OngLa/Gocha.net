package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.MemberService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.exception.ErrorResponse;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "이메일 인증 - 인증요청 API", description = "이메일 중복 검사")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 Email 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/auth-email")
    public ResponseEntity<Void> getUserEmail(@RequestParam String email) {
        if (memberService.existEmail(email)) {
        } else {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "회원가입 - 닉네임 중복 검사 API", description = "닉네임 중복 검사")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 Name 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/name-check")
    public ResponseEntity<Void> getUserName(@RequestParam String name) {
        if (memberService.existName(name)) {
        } else {
            throw new CustomException(ErrorCode.DUPLICATE_NAME);
        }
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "유저 회원가입 API", description = "유저 회원가입 진행")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 user 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/signup")
    public ResponseEntity<Void> postUser(@RequestBody MemberSignupReqDto memberSignupReqDto) {
        memberService.createMember(memberSignupReqDto);

        return ResponseEntity.ok(null);
    }

    @Operation(summary = " 정비소 회원가입 API", description = "정비소 회원가입 진행")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 user 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/admin-signup")
    public ResponseEntity<Void> postAdmin(@RequestBody MemberSignupReqDto memberSignupReqDto) {
        memberService.creatAdminMember(memberSignupReqDto);

        return ResponseEntity.ok(null);
    }
}
