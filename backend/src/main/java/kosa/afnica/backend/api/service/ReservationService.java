package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.reservation.AdminDto;
import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.dto.reservation.ReservationResDto;
import kosa.afnica.backend.db.dto.reservation.AdminDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface ReservationService {

    //예약 출력
    public List<ReservationResDto> readReservationList(HttpServletRequest request);

    //예약 하기
    public void createReservation(HttpServletRequest request, ReservationReqDto reservationReqDto);

    //예약 삭제
    public void deleteReservation(Long id);

    //ADMIN 예약자 출력
    public List<AdminDto> findReservationUserList(HttpServletRequest request);

    //ADMIN state 업데이트
    public void updateState(AdminDto adminDto);
}