package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.entity.Reservation;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {
    //예약 출력
    public List<Reservation> findReservationByMemberId(Long memberId);

    //예약 하기
    public void saveReservation(ReservationReqDto reservationReqDto);

    //예약 삭제
    public Long deleteById(Long id);

    //이메일에서 id 파싱
    public Long findIdByEmail(String email);

    //ADMIN 예약자 출력
//    public List<Reservation> findReservationBycarcenterId(Long carcenterId);
}
