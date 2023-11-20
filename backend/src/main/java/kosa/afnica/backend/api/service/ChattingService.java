package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.car.BrandResDto;
import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import kosa.afnica.backend.db.dto.chatting.*;

import java.util.List;

public interface ChattingService {
    
    List<ChattingResDto> findAllChatting(); // 정비소 목록 반환
    List<ChattingResDto> findAllChatting2(Long memberId); // 나에게 메세지 보낸 유저 목록 반환
    Long findChatroom(Long member1Id, Long member2Id);
    List<MessageResDto> findAllMessage(Long chatroomId);
    CarDataResDto findCarData(Long cardataId);
    List<ChattingCarResDto> findAllCar(Long memberId);
    List<ChattingCarDataResDto> findAllCarData(Long memberId);
    void insertMessage(SendMessageReqDto sendMessageReqDto);

}
