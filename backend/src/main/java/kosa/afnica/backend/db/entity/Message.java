package kosa.afnica.backend.db.entity;

import lombok.*;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class Message {
    private Long id;
    private String chattingId;
    private String memberId;
    private Timestamp sendDate;
    private String title;
    private String content;
    private boolean isReservation;
    private Long carcenterId;

    @Builder
    public Message(Long id, String chattingId, String memberId, Timestamp sendDate, String title, String content, boolean isReservation, Long carcenterId) {
        this.id = id;
        this.chattingId = chattingId;
        this.memberId = memberId;
        this.sendDate = sendDate;
        this.title = title;
        this.content = content;
        this.isReservation = isReservation;
        this.carcenterId = carcenterId;
    }
}
