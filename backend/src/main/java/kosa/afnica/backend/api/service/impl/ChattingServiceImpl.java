package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.ChattingService;
import kosa.afnica.backend.config.exception.CustomException;
import kosa.afnica.backend.config.exception.ErrorCode;
import kosa.afnica.backend.db.dto.chatting.ChattingResDto;
import kosa.afnica.backend.db.dto.chatting.MessageResDto;
import kosa.afnica.backend.db.mapper.ChattingMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.Date;
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
        return chattingMapper.findAllCarcenter();
    };

    @Override
    public Long findChatroom(Long userId, Long carcenterId) {
        // 숫자가 작은게 user, 숫자가 큰게 carcenter이다.
        Long temp = 0L;
        if (userId > userId) {
            temp = userId;
            userId = carcenterId;
            carcenterId = temp;
        }
        
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
        return chattingMapper.findAllMessageByChatroomID(chattingId);
    }

    ;




}
