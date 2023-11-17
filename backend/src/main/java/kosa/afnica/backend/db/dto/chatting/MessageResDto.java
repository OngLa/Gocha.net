package kosa.afnica.backend.db.dto.chatting;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class MessageResDto {
    private Long id;
    private String memberId;
    private Timestamp sendDate;
    private String title;
    private String content;
    private Boolean isReservation;
    private Long cardataId;

    @Builder
    public MessageResDto(Long id, String memberId, Timestamp sendDate, String title, String content, Boolean isReservation, Long cardataId) {
        this.id = id;
        this.memberId = memberId;
        this.sendDate = sendDate;
        this.title = title;
        this.content = content;
        this.isReservation = isReservation;
        this.cardataId = cardataId;
    }
}
