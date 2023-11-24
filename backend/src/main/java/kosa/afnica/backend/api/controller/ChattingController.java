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
import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import kosa.afnica.backend.db.dto.chatting.*;
import kosa.afnica.backend.db.entity.Member;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    private final MemberMapper memberMapper; // User, Carcenter 구분하기 위해 Role 얻을 때 사용


    @Operation(summary = "Chatting Carcenter List API(고객)", description = "비대면 진단을 위해 채팅방 목록 출력(모든 카센터 다 출력)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = ChattingResDto.class))),
            @ApiResponse(responseCode = "404", description = "카센터 데이터가 존재하지 않습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/carcenter")
    public ResponseEntity<List<ChattingResDto>> getChatting() {
        // 정비소 id, name을 list로 조회(회원탈퇴x)
        List<ChattingResDto> chattingList = chattingService.findAllChatting();
        if(chattingList == null) {
            throw new CustomException(ErrorCode.CHATTING_CARCENTERLIST_NOT_FOUND);
        }

        return ResponseEntity.ok(chattingList);
    }


    //    public ResponseEntity<List<ChattingResDto>> getChatting2(HttpServletRequest httpServletRequest) {
    @Operation(summary = "Chatting User List API(카센터)", description = "비대면 진단을 위해 채팅방 목록 출력(본인에게 메세지 보낸 고객 다 출력)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = ChattingResDto.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 유저입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "본인에게 메세지를 보낸 유저가 존재하지 않습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/user")
    public ResponseEntity<List<ChattingResDto>> getChatting2(HttpServletRequest httpServletRequest) {
        // 헤더로 Token받고 email얻고 mapper로 id로 변환
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();

        // 정비소 id, name을 list로 조회(회원탈퇴x)
        List<ChattingResDto> chattingList = chattingService.findAllChatting2(memberId);
        if(chattingList == null) {
            throw new CustomException(ErrorCode.CHATTING_USERLIST_NOT_FOUND);
        }

        return ResponseEntity.ok(chattingList);
    }

    @Operation(summary = "CarcenterInfo - 카센터 정보 조회 API(공통)", description = "채팅방 입장 전 정비소의 phonenumber, email, address를 보여주기 위함. 고객 예약 관리에서도 사용.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = CarcenterInfoResDto.class))),
            @ApiResponse(responseCode = "404", description = "해당 카센터의 정보가 존재하지 않습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/carcenterinfo")
    public ResponseEntity<CarcenterInfoResDto> getCarcenterInfo(@RequestParam Long carcenterId) {
        // 해당 carcenter의 정보(phonenumber, email, address)를 반환
        CarcenterInfoResDto carcenterInfo = chattingService.findCarcenterInfo(carcenterId);

        return ResponseEntity.ok(carcenterInfo);
    }

    @Operation(summary = "Chatroom - 메세지 조회 API(공통)", description = "채팅방 - 메세지 전체 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = MessageResDto.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 유저입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/chatroom")
    public ResponseEntity<List<MessageResDto>> getChatroom(HttpServletRequest httpServletRequest, @RequestParam(name = "member_id") Long member2Id) {
        // get id
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long member1Id = member.getId();

        // 권한에 따라 첫번째 인자는 user, 두번째 인자는 carcenter로 넣기.(1:1문의라 멤버끼리 메세지 주고받지 않고 carcenterId, userId로 id 입력함)
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

    @Operation(summary = "Chatroom - Car Data 상세조회 API(고객)", description = "Car Data 불러오기 API - 채팅방에서 고객이 데이터 첨부 시 데이터 Open할 때 사용하는 API")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = CarDataResDto.class))),
            @ApiResponse(responseCode = "404", description = "차량 데이터가 존재하지 않습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/open-cardata")
    public ResponseEntity<CarDataResDto> getCarData(@RequestParam Long cardataId) {
        // cardataId를 받아 모든 속성 다 반환
        CarDataResDto resDto = chattingService.findCarData(cardataId);

        return ResponseEntity.ok(resDto);
    }

    @Operation(summary = "WriteForm - 본인 Car List 조회 API(고객)", description = "글 작성 시 본인 자동차 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = ChattingCarResDto.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 유저입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/car")
    public ResponseEntity<List<ChattingCarResDto>> getChattingCar(HttpServletRequest httpServletRequest) {
        // get id
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();

        // 본인의 차량 목록을 list로 반환
        List<ChattingCarResDto> carList = chattingService.findAllCar(memberId);

        return ResponseEntity.ok(carList);
    }

    @Operation(summary = "WriteForm - 본인 CarData List 조회 API(고객)", description = "글 작성 시 본인 차데이터 조회")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공", content = @Content(schema = @Schema(implementation = ChattingCarDataResDto.class))),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 유저입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @GetMapping("/cardata")
    public ResponseEntity<List<ChattingCarDataResDto>> getChattingCarData(HttpServletRequest httpServletRequest) {
        // get id
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();

        // 본인의 차데이터 목록을 list로 반환
        List<ChattingCarDataResDto> carDataList = chattingService.findAllCarData(memberId);

        return ResponseEntity.ok(carDataList);
    }

    @Operation(summary = "WriteForm - SendMessage API(공통)", description = "메세지 작성 - 제목, 내용, 예약활성화여부, 차량데이터id를 받아와 저장. Role에 따라 예약활성화여부 or 차량데이터id 저장여부가 switch됨.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 유저입니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "글 작성에 실패하였습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
    })
    @PostMapping("/sendmessage")
    public ResponseEntity<Void> postMessage(HttpServletRequest httpServletRequest, @RequestBody SendMessageReqDto sendMessageReqDto) {
        // get id
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authorization").substring(7));
        Member member = memberMapper.findByEmail(email)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        Long memberId = member.getId();

        // 채팅방 찾기.
        Long chattingId = null;
        log.info(String.valueOf(sendMessageReqDto.getToMemberId()));
        if (Objects.equals(memberService.findRole(email), "ROLE_CARCENTER")) {
            // 두사람의 채팅방 id 조회(id는 채팅방에 들어간사람, memberId는 상대방 id)
            chattingId = chattingService.findChatroom(sendMessageReqDto.getToMemberId(), memberId);
        } else {
            chattingId = chattingService.findChatroom(memberId, sendMessageReqDto.getToMemberId());
        }
        sendMessageReqDto.setMemberId(memberId);
        sendMessageReqDto.setChattingId(chattingId);
        sendMessageReqDto.setSendDate();

        // send
        chattingService.insertMessage(sendMessageReqDto);

        return ResponseEntity.ok(null);
    }

}
