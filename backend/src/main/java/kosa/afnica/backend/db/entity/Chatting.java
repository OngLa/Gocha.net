package kosa.afnica.backend.db.entity;

import lombok.*;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class Chatting {
    private Long id;
    private String carcenterId;
    private String userId;
    private Timestamp createDate;

    @Builder
    public Chatting(long id, String carcenterId, String userId, Timestamp createDate) {
        this.id = id;
        this.carcenterId = carcenterId;
        this.userId = userId;
        this.createDate = createDate;
    }
}
