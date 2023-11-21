package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.reservation.ReservationResDto;
import kosa.afnica.backend.db.dto.reservation.AdminDto;
import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ReservationService {

     public List<ReservationResDto> readReservationList(HttpServletRequest request); //     예약 출력
     public void createReservation(HttpServletRequest request, ReservationReqDto reservationReqDto); //     예약하기
    public void deleteReservation(Long id); //     예약 삭제
    public List<AdminDto> findReservationUserList(HttpServletRequest request); //     ADMIN 예약자 출력
}