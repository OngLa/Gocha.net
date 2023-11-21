package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import kosa.afnica.backend.db.dto.chatting.*;

import java.util.List;

public interface ChattingService {

    List<ChattingResDto> findAllChatting(); // 정비소 목록 반환

    List<ChattingResDto> findAllChatting2(Long memberId); // 나에게 메세지 보낸 유저 목록 반환
    CarcenterInfoResDto findCarcenterInfo(Long carcenterId); // 해당 카센터의 정보 반환

    Long findChatroom(Long member1Id, Long member2Id); // 채팅방 찾기(유저, 카센터)

    List<MessageResDto> findAllMessage(Long chatroomId); // 채팅방 입장 시 메세지 조회

    CarDataResDto findCarData(Long cardataId); // 채팅방에서 데이터 오픈 시 데이터 load

    List<ChattingCarResDto> findAllCar(Long memberId); // 글 작성 시 본인 차량 list 조회

    List<ChattingCarDataResDto> findAllCarData(Long memberId); // 글 작성 시 본인 차데이터 list 조회

    void insertMessage(SendMessageReqDto sendMessageReqDto); // 글 작성 - 메세지 저장

}
