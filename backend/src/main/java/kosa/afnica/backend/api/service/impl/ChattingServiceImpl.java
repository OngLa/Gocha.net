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
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChattingServiceImpl implements ChattingService {
    private final ChattingMapper chattingMapper;

    @Override
    public List<ChattingResDto> findAllChatting() {
        // 정비소 목록 반환
        return chattingMapper.findAllCarcenter();
    }

    @Override
    public List<ChattingResDto> findAllChatting2(Long memberId) {
        // 나에게 메세지 보낸 유저 목록 반환
        List<Long> sendUserList = chattingMapper.findSendUser(memberId);
        return chattingMapper.findAllUser(sendUserList);
    }

    @Override
    public CarcenterInfoResDto findCarcenterInfo(Long carcenterId) {
        // 해당 카센터의 정보 반환
        return chattingMapper.findCarcenterInfo(carcenterId);
    }

    @Override
    public Long findChatroom(Long userId, Long carcenterId) {
        // 채팅방 찾기(유저, 카센터)
        // 여기서 두사람의 채팅방 존재 여부를 조회하고 있으면 그대로 리턴, 없으면 새로 만들고 그 id를 리턴
        Optional<Long> existChatroom = chattingMapper.findChatroom(userId, carcenterId);
        if (existChatroom.isPresent()) {
            return existChatroom.get();
        } else {
            Timestamp createDate = new Timestamp(System.currentTimeMillis());
            return chattingMapper.saveChatroom(userId, carcenterId, createDate);
        }
    }

    @Override
    public List<MessageResDto> findAllMessage(Long chattingId) {
        // 채팅방 입장 시 메세지 조회
        return chattingMapper.findAllMessageByChatroomId(chattingId);
    }

    @Override
    public CarDataResDto findCarData(Long cardataId) {
        // 채팅방에서 데이터 오픈 시 데이터 load
        CarData carData = chattingMapper.findCarDataByCarId(cardataId)
                .orElseThrow(() -> new CustomException(ErrorCode.CARDATA_NOT_FOUND));

        return new CarDataResDto(carData);
    }

    @Override
    public List<ChattingCarResDto> findAllCar(Long memberId) {
        // 글 작성 시 본인 차량 list 조회
        return chattingMapper.findAllCarByMemberId(memberId);
    }

    @Override
    public List<ChattingCarDataResDto> findAllCarData(Long memberId) {
        // 글 작성 시 본인 차데이터 list 조회
        return chattingMapper.findAllCarDataByMemberId(memberId);
    }

    @Override
    public void insertMessage(SendMessageReqDto sendMessageReqDto) {
        // 글 작성 - 메세지 저장
        chattingMapper.saveMessage(sendMessageReqDto);
    }


}
