package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.reservation.ReservationDto;
import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.entity.Reservation;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
public interface ReservationService {

     public List<ReservationDto> readReservationList(HttpServletRequest request);
     public ReservationReqDto createReservation(HttpServletRequest request, ReservationReqDto reservationreqdto);

}