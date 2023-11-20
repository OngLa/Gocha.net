package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import kosa.afnica.backend.api.service.impl.ChattingServiceImpl;
import kosa.afnica.backend.api.service.impl.MemberServiceImpl;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.config.exception.ErrorResponse;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import kosa.afnica.backend.db.dto.chatting.*;
import kosa.afnica.backend.db.dto.member.MemberLoginReqDto;
import kosa.afnica.backend.db.dto.member.MemberLoginResDto;
import kosa.afnica.backend.db.entity.Member;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatting")
public class ChattingController {
    private final ChattingServiceImpl chattingService;
    private final MemberServiceImpl memberService;
    private final MemberMapper memberMapper;


    @Operation(summary = "Chatting Carcenter List API", description = "비대면 진단을 위해 채팅방 목록 출력 - 고객용(모든 카센터 다 출력)")
    @GetMapping ("/carcenter")
    public ResponseEntity<List<ChattingResDto>> getChatting() {
        // 헤더로 Token받고 email얻고 mapper로 id로 변환
//        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authencation"));

        // 정비소 id, name을 list로 조회
        List<ChattingResDto> chattingList = chattingService.findAllChatting();

        return ResponseEntity.ok(chattingList);
    }


    //    public ResponseEntity<List<ChattingResDto>> getChatting2(HttpServletRequest httpServletRequest) {
    @Operation(summary = "Chatting User List API", description = "비대면 진단을 위해 채팅방 목록 출력 - 카센터용(본인에게 메세지 보낸 고객 다 출력)")
    @GetMapping ("/user")
    public ResponseEntity<List<ChattingResDto>> getChatting2(HttpServletRequest httpServletRequest) {
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();

        // 정비소 id, name을 list로 조회
        List<ChattingResDto> chattingList = chattingService.findAllChatting2(memberId);

        return ResponseEntity.ok(chattingList);
    }

    @Operation(summary = "Chatroom API", description = "채팅방 - 메세지 전체 조회(공통)")
    @GetMapping ("/chatroom")
    public ResponseEntity<List<MessageResDto>> getChatroom(HttpServletRequest httpServletRequest, @RequestParam(name = "member_id") Long member2Id) {
        // 헤더로 Token받고 email얻고 mapper로 id로 변환
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long member1Id = member.getId();

        // 권한에 따라 첫번째 인자는 user, 두번째 인자는 carcenter로 넣기.
        Long chattingId = null;
        if (Objects.equals(memberService.findRole(email), "ROLE_CARCENTER")) {
            // 두사람의 채팅방 id 조회(id는 채팅방에 들어간사람, memberId는 상대방 id)
            chattingId = chattingService.findChatroom(member2Id, member1Id);
        } else {
            chattingId = chattingService.findChatroom(member1Id, member2Id);
        }

        // 해당 채팅방의 메세지 리턴
        List<MessageResDto> messageList = chattingService.findAllMessage(chattingId);

        return ResponseEntity.ok(messageList);
    }

    @Operation(summary = "Data ID의 해당 Car Data 불러오기 API", description = "Car Data 불러오기 API - 채팅방에서 고객이 데이터 첨부 시 데이터 로딩할 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = CarDataResDto.class))),
            @ApiResponse(responseCode = "404", description = "차량 데이터가 존재하지 않습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })

    @GetMapping("/open-cardata")
    public ResponseEntity<CarDataResDto> getCarData(@RequestParam Long cardataId) {
        CarDataResDto resDto = chattingService.findCarData(cardataId);

        return ResponseEntity.ok(resDto);
    }

    @Operation(summary = "Car API", description = "채팅방 - 글 작성 시 본인 자동차 조회(고객)")
    @GetMapping ("/car")
    public ResponseEntity<List<ChattingCarResDto>> getChattingCar(HttpServletRequest httpServletRequest) {
        // 헤더로 Token받고 email얻고 mapper로 id로 변환
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();

        // 해당 채팅방의 메세지 리턴
        List<ChattingCarResDto> carList = chattingService.findAllCar(memberId);

        return ResponseEntity.ok(carList);
    }

    @Operation(summary = "Car API", description = "채팅방 - 글 작성 시 본인 자동차 조회(고객)")
    @GetMapping ("/cardata")
    public ResponseEntity<List<ChattingCarDataResDto>> getChattingCarData(HttpServletRequest httpServletRequest) {
        // 헤더로 Token받고 email얻고 mapper로 id로 변환
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();
        log.info("시작");

        // 해당 채팅방의 메세지 리턴
        List<ChattingCarDataResDto> carDataList = chattingService.findAllCarData(memberId);

        log.info("끝");
        log.info(carDataList.toString());

        return ResponseEntity.ok(carDataList);
    }

    @Operation(summary = "SendMessage API", description = "글 작성 - 제목, 내용, 예약활성화여부, 차량데이터id를 받아와 저장. Role에 따라 예약활성화여부 or 차량데이터id 저장여부가 switch됨.")
    @PostMapping("/sendmessage")
    public ResponseEntity<Void> postMessage(HttpServletRequest httpServletRequest, @RequestBody SendMessageReqDto sendMessageReqDto) {
        log.info(String.valueOf(sendMessageReqDto.getIsReservation()));
        log.info(String.valueOf(sendMessageReqDto.getCardataId()));
        log.info(String.valueOf(sendMessageReqDto.getToMemberId()));

        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();
        log.info("시작");

        Long chattingId = chattingService.findChatroom(memberId, sendMessageReqDto.getToMemberId());

        sendMessageReqDto.setMemberId(memberId);
        sendMessageReqDto.setChattingId(chattingId);
        sendMessageReqDto.setSendDate();

        chattingService.insertMessage(sendMessageReqDto);

        return ResponseEntity.ok(null);
    }

}
