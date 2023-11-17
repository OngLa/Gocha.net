package kosa.afnica.backend.api.controller;

import io.swagger.v3.oas.annotations.Operation;
import kosa.afnica.backend.api.service.impl.ChattingServiceImpl;
import kosa.afnica.backend.api.service.impl.MemberServiceImpl;
import kosa.afnica.backend.config.security.JwtUtil;
import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.dto.chatting.ChattingResDto;
import kosa.afnica.backend.db.dto.chatting.MessageResDto;
import kosa.afnica.backend.db.dto.member.MemberLoginReqDto;
import kosa.afnica.backend.db.dto.member.MemberLoginResDto;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatting")
public class ChattingController {
    private final ChattingServiceImpl ChattingService;

    @Operation(summary = "Chatting User List API", description = "비대면 진단을 위해 채팅방 목록 출력 - 고객용(모든 카센터 다 출력)")
    @GetMapping ("/carcenter")
    public ResponseEntity<List<ChattingResDto>> getChatting() {
        // 헤더로 Token받고 email얻고 mapper로 id로 변환
//        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authencation"));

        // 정비소 id, name을 list로 조회
        List<ChattingResDto> chattingList = ChattingService.findAllChatting();

        return ResponseEntity.ok(chattingList);
    }

    @Operation(summary = "Chatroom API", description = "채팅방 - 메세지 전체 조회(공통)")
    @GetMapping ("/chatroom")
    public ResponseEntity<List<MessageResDto>> getChatting(HttpServletRequest httpServletRequest, @RequestParam(name = "member_id") Long member2Id) {
        // 헤더로 Token받고 email얻고 mapper로 id로 변환
        String email = JwtUtil.getEmail(httpServletRequest.getHeader("Authencation"));
        Long member1Id = ChattingService.findIdByEmail(email);

        // 두사람의 채팅방 id 조회(id는 채팅방에 들어간사람, memberId는 상대방 id)
        Long chattingId = ChattingService.findChatroom(member1Id, member2Id);

        // 해당 채팅방의 메세지 리턴
        List<MessageResDto> messageList = ChattingService.findAllMessage(chattingId);

        return ResponseEntity.ok(messageList);
    }

}
