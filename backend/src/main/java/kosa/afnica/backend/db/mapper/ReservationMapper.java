package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Reservation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;

import java.util.List;

@Mapper
public interface ReservationMapper {
//###############################################################################################

    public List<Reservation> findReservationByMemberId(Long memberId);
    //memberId를 entity타입으로 저장하는 메소드
    public Long findIdByEmail(String email);
    //에메일을 저장하는 메소드

//###############################################################################################

//    int deleteById(Long id);

//###############################################################################################

//    public int insert(Reservation reservation);
}
