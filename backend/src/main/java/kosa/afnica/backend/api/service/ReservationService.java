package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.reservation.ReservationResDto;
import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
public interface ReservationService {

     public List<ReservationResDto> readReservationList(HttpServletRequest request);
     public void createReservation(HttpServletRequest request, ReservationReqDto reservationReqDto);
     public void deleteReservation(Long id);
}