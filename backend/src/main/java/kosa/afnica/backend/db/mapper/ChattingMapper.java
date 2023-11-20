package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.chatting.*;
import kosa.afnica.backend.db.entity.CarData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface ChattingMapper {

    // 모든 Brand 조회
    List<ChattingResDto> findAllCarcenter();
    List<Long> findSendUser(Long memberId);
    List<ChattingResDto> findAllUser(List<Long> sendUserList);
    Optional<Long> findChatroom(@Param("userId") Long userId, @Param("carcenterId") Long carcenterId);
    Long saveChatroom(@Param("userId") Long userId, @Param("carcenterId") Long carcenterId, @Param("createDate") Timestamp createDate);
    List<MessageResDto> findAllMessageByChatroomId(Long chattingId);
    Optional<CarData> findCarDataByCarId(Long cardataId);
    List<ChattingCarResDto> findAllCarByMemberId(Long memberId);
    List<ChattingCarDataResDto> findAllCarDataByMemberId(Long memberId);
    void saveMessage(SendMessageReqDto sendMessageReqDto);



}
