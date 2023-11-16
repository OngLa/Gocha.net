package kosa.afnica.backend.db.dto.reservation;

import kosa.afnica.backend.db.entity.Reservation;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor
public class ReservationDto {
    private Long id;
    private Long memberId;
    private String state;
    private Date reservedDate;
    private Long carcenterId;

    public ReservationDto(Reservation reservation) {
        this.id = reservation.getId();
        this.memberId = reservation.getMemberId();
        this.state = reservation.getState();
        this.reservedDate = reservation.getReservedDate();
        this.carcenterId = reservation.getCarcenterId();
    }
}

