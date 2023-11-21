package kosa.afnica.backend.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class Reservation {

    private Long id;
    private Long state;
    private Date reservedDate;
    private Long memberId;
    private Long carcenterId;
    private Long carDataId;

    public Reservation(Long id, Long state, Date reservedDate, Long memberId, Long carcenterId, Long carDataId) {
        this.id = id;
        this.state = state;
        this.reservedDate = reservedDate;
        this.memberId = memberId;
        this.carcenterId = carcenterId;
        this.carDataId = carDataId;
    }
}
