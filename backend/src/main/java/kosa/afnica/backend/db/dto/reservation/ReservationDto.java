package kosa.afnica.backend.db.dto.reservation;

import kosa.afnica.backend.db.entity.Reservation;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@NoArgsConstructor
public class ReservationDto {
    private Long id;
    private Long memberId;
    private Long state;
    private String reservedDate;
    private Long carcenterId;

    public ReservationDto(Reservation reservation) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        this.id = reservation.getId();
        this.memberId = reservation.getMemberId();
        this.state = reservation.getState();
        this.reservedDate = format.format(reservation.getReservedDate());
        this.carcenterId = reservation.getCarcenterId();
    }
    //data 출력형식 변환
}

