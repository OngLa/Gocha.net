package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.chatting.ChattingResDto;
import kosa.afnica.backend.db.dto.chatting.MessageResDto;
import kosa.afnica.backend.db.entity.Brand;
import kosa.afnica.backend.db.entity.CarType;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Mapper
public interface ChattingMapper {

    // 모든 Brand 조회
    List<ChattingResDto> findAllCarcenter();

    Long findIdByEmail(String email);

    Optional<Long> findChatroom(@Param("userId") Long userId, @Param("carcenterId") Long carcenterId);

    List<MessageResDto> findAllMessageByChatroomID(Long chattingId);

}
