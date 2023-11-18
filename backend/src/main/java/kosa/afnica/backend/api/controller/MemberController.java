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
import kosa.afnica.backend.db.dto.member.EmailVerificationDto;
import kosa.afnica.backend.db.dto.member.MemberMypageResDto;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.remoting.support.RemoteExporter;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "이메일 인증 - 인증번호 요청 API", description = "이메일 중복 검사 및 인증번호 이메일로 전송")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 Email 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/email")
    public ResponseEntity<String> applyCode(@RequestParam String email) throws Exception {
        if (memberService.existEmail(email)) {
            String confirm = memberService.sendMessage(email);
            return ResponseEntity.ok(confirm);
        } else {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }
    }

    @Operation(summary = "이메일 인증 - 인증번호 비교 API", description = "입력된 인증번호와 생성된 인증번호 비교")
    @ApiResponses(
            {@ApiResponse(responseCode = "200", description = "성공")
    })
    @PostMapping("/email-veri")
    public ResponseEntity<Void> compareCode(@RequestBody EmailVerificationDto emailVerificationDto) {

        return ResponseEntity.ok(null);
    }


    @Operation(summary = "회원가입 - 닉네임 중복 검사 API", description = "닉네임 중복 검사")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 Name 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/name-check")
    public ResponseEntity<Void> getUserName(@RequestParam("nickname") String name) {
        if (memberService.existName(name)) {
        } else {
            throw new CustomException(ErrorCode.DUPLICATE_NAME);
        }
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "유저 회원가입 API", description = "요청받은 회원 정보를 기반으로 회원가입 진행")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 user 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/signup")
    public ResponseEntity<Void> postUser(@RequestBody MemberSignupReqDto memberSignupReqDto) {
        memberService.createMember(memberSignupReqDto);

        return ResponseEntity.ok(null);
    }

/*    @Operation(summary = " 정비소 회원가입 API", description = "정비소 회원가입 진행")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 user 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/admin-signup")
    public ResponseEntity<Void> postAdmin(@RequestBody MemberSignupReqDto memberSignupReqDto) {
        memberService.creatAdminMember(memberSignupReqDto);

        return ResponseEntity.ok(null);
    }*/

    @Operation(summary = "유저 마이페이지 API", description = "마이페이지에서 이메일 기반으로 회원 정보 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = MemberMypageResDto.class)))
    })
    @GetMapping("/mypage")
    public ResponseEntity<MemberMypageResDto> getMypage(HttpServletRequest request) {

        MemberMypageResDto memberMypageResDto = memberService.findMypage(request);

        return ResponseEntity.ok(memberMypageResDto);
    }

}
