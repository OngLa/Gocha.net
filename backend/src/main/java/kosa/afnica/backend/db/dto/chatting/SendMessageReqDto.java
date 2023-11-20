package kosa.afnica.backend.db.dto.chatting;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class SendMessageReqDto {
    private Long toMemberId;
    private Long chattingId;
    private String title;
    private String content;
    private Boolean isReservation;
    private Long cardataId;

    private Long memberId;
    private Timestamp sendDate;

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }
    public void setChattingId(Long chattingId) {
        this.chattingId = chattingId;
    }
    public void setSendDate() {
        this.sendDate = new Timestamp(System.currentTimeMillis());
    }
}
