package kosa.afnica.backend.db.dto.chatting;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class MessageResDto {
    private Long id;
    private String memberId;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime sendDate;
    private String title;
    private String content;
    private Boolean isReservation;
    private Long cardataId;

    public MessageResDto(Long id, String memberId, LocalDateTime sendDate, String title, String content, Boolean isReservation, Long cardataId) {
        this.id = id;
        this.memberId = memberId;
        this.sendDate = sendDate;
        this.title = title;
        this.content = content;
        this.isReservation = isReservation;
        this.cardataId = cardataId;
    }
}
