package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.reservation.ReservationReqDto;
import kosa.afnica.backend.db.dto.reservation.ReservationResDto;
import kosa.afnica.backend.db.dto.reservation.AdminDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {

    //예약출력
    public List<ReservationResDto> findReservationByMemberId(Long memberId);

    //이메일에서 id 파싱
    public Long findIdByEmail(String email);

    //예약하기
    public void saveReservation(ReservationReqDto reservationReqDto);

    //예약 삭제
    public void deleteById(Long id);

    //AdDMIN 예약자 출력
    public List<AdminDto> findReservationBycarcenter(Long carcenterId);
}
