package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.MailService;
import kosa.afnica.backend.api.service.MemberService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.exception.ErrorResponse;
import kosa.afnica.backend.db.dto.member.EmailVerificationDto;
import kosa.afnica.backend.db.dto.member.MemberMypageResDto;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;
import kosa.afnica.backend.db.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.remoting.support.RemoteExporter;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;
    private final MailService mailService;

    @Operation(summary = "이메일 인증 - 인증번호 요청 API", description = "이메일 중복 검사 및 인증번호 이메일로 전송")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "409", description = "존재하는 Email 입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping("/email")
    public ResponseEntity<Void> getVeriCode(@RequestBody EmailVerificationDto emailVerificationDto) throws Exception {

        if (memberService.existEmail(emailVerificationDto.getVeriEmail())) {
            mailService.sendMessage(emailVerificationDto.getVeriEmail());
            return ResponseEntity.ok(null);
        } else {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }
    }

    @Operation(summary = "이메일 인증 - 인증번호 비교 API", description = "입력된 인증번호와 생성된 인증번호 비교")
    @ApiResponses({@ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 인증 번호입니다", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping("/email-veri")
    public ResponseEntity<Void> compareVeriCode(@RequestParam String veriEmail, @RequestParam String veriCode) {
        memberService.findCode(veriEmail, veriCode);
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

    //정비소 목록 출력
    @Operation(summary = "정비소목록 출력 API", description = "정비소 목록 출력시키는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = Member.class)))),
    })
    @GetMapping("/reservation/carcenter")
    public ResponseEntity<List<Member>> getCarcenter() {
        List<Member> members = memberService.findCarcenter();
        return ResponseEntity.ok(members);
    }
}
