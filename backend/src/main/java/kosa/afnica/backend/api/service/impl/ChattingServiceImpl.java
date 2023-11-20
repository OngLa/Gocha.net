package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.ChattingService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.db.dto.carData.CarDataResDto;
import kosa.afnica.backend.db.dto.chatting.*;
import kosa.afnica.backend.db.entity.CarData;
import kosa.afnica.backend.db.mapper.ChattingMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService {
    private final ChattingMapper chattingMapper;

    @Override
    public List<ChattingResDto> findAllChatting() {
        return chattingMapper.findAllCarcenter();
    }

    @Override
    public List<ChattingResDto> findAllChatting2(Long memberId) {
        List<Long> sendUserList = chattingMapper.findSendUser(memberId); // 나에게 메세지 보낸 유저 목록
        return chattingMapper.findAllUser(sendUserList);
    }

    @Override
    public Long findChatroom(Long userId, Long carcenterId) {
        // 여기서 두사람의 채팅방 존재 여부를 조회하고 있으면 그대로 리턴, 없으면 새로 만들고 그 id를 리턴
        Optional<Long> existChatroom = chattingMapper.findChatroom(userId, carcenterId);
        if(existChatroom.isPresent()) {
            return existChatroom.get();
        } else {
            Timestamp createDate = new Timestamp(System.currentTimeMillis());
            return  chattingMapper.saveChatroom(userId, carcenterId, createDate);
        }
    }

    @Override
    public List<MessageResDto> findAllMessage(Long chattingId) {
        return chattingMapper.findAllMessageByChatroomId(chattingId);
    }

    @Override
    public CarDataResDto findCarData(Long cardataId) {
        CarData carData = chattingMapper.findCarDataByCarId(cardataId)
                .orElseThrow(() -> new CustomException(ErrorCode.CARDATA_NOT_FOUND));

        return new CarDataResDto(carData);
    }

    @Override
    public List<ChattingCarResDto> findAllCar(Long memberId) {
        return chattingMapper.findAllCarByMemberId(memberId);
    }

    @Override
    public List<ChattingCarDataResDto> findAllCarData(Long memberId) {
        return chattingMapper.findAllCarDataByMemberId(memberId);
    }

    @Override
    public void insertMessage(SendMessageReqDto sendMessageReqDto) {
        chattingMapper.saveMessage(sendMessageReqDto);
    }


}
