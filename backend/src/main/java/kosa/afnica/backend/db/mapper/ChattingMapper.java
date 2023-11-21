package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.chatting.*;
import kosa.afnica.backend.db.entity.CarData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Mapper
public interface ChattingMapper {

    List<ChattingResDto> findAllCarcenter(); // 정비소 목록 반환

    List<Long> findSendUser(Long memberId); // 나에게 메세지 보낸 유저 목록 반환

    List<ChattingResDto> findAllUser(List<Long> sendUserList); // 채팅방 찾기(유저, 카센터)

    CarcenterInfoResDto findCarcenterInfo(Long carcenterId); // 해당 카센터의 정보 반환

    Optional<Long> findChatroom(@Param("userId") Long userId, @Param("carcenterId") Long carcenterId); // 채팅방 조회

    Long saveChatroom(@Param("userId") Long userId, @Param("carcenterId") Long carcenterId, @Param("createDate") Timestamp createDate); // (기존 채팅방이 없으면) 채팅방 생성

    List<MessageResDto> findAllMessageByChatroomId(Long chattingId); // 채팅방 입장 시 메세지 조회

    Optional<CarData> findCarDataByCarId(Long cardataId); // 채팅방에서 데이터 오픈 시 데이터 load

    List<ChattingCarResDto> findAllCarByMemberId(Long memberId); // 글 작성 시 본인 차량 list 조회

    List<ChattingCarDataResDto> findAllCarDataByMemberId(Long memberId); // 글 작성 시 본인 차데이터 list 조회

    void saveMessage(SendMessageReqDto sendMessageReqDto); // 글 작성 - 메세지 저장
}
