package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.reservation.FcCarcenterDto;
import kosa.afnica.backend.db.dto.reservation.FcDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface FcMapper {
    //주정비소 등록
    void saveFc(FcDto fcDto);

    //주 정비소 등록여부 확인
    Optional<Long> findByMemberIdAndCarcenterId(FcDto fcdto);

    //주 정비소 출력
    List<FcCarcenterDto> findCarcenterByMemberId(Long memberId);

    //주정비소 삭제
    void deleteById(Long id);
}
