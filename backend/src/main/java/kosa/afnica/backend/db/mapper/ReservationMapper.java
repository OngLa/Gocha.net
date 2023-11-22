package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.dto.reservation.ReservationResDto;
import kosa.afnica.backend.db.dto.reservation.AdminDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {
    public List<ReservationResDto> findReservationByMemberId(Long memberId); //memberId를 entity타입으로 저장하는 메소드
    public Long findIdByEmail(String email); //에메일을 저장하는 메소드
    public void saveReservation(ReservationReqDto reservationReqDto); //예약 하기
    public void deleteById(Long id); //예약목록삭제 메소드
    public List<AdminDto> findReservationBycarcenter(Long carcenterId); //ADMIN 예약자 출력
}
