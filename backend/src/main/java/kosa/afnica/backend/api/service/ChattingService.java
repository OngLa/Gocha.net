package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.dto.chatting.ChattingResDto;
import kosa.afnica.backend.db.dto.chatting.MessageResDto;

import java.util.List;

public interface ChattingService {
    
    List<ChattingResDto> findAllChatting(); // 정비소 목록 반환
    Long findIdByEmail(String email);
    Long findChatroom(Long member1Id, Long member2Id);
    List<MessageResDto> findAllMessage(Long chatroomId);

}
