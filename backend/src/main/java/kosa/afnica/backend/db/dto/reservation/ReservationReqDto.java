package kosa.afnica.backend.db.dto.reservation;

import kosa.afnica.backend.db.entity.Reservation;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ReservationReqDto {

    private Long id;
    private Long memberId;
    private Date reservedDate;
    private Long carcenterId;
    private Long carDataId;

    public ReservationReqDto(Long id, Long memberId, Date reservedDate, Long carcenterId, Long carDataId) {
        this.id = id;
        this.memberId = memberId;
        this.reservedDate = reservedDate;
        this.carcenterId = carcenterId;
        this.carDataId = carDataId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }
}

