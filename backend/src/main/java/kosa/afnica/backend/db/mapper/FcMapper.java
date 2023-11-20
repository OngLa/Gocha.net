package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.dto.reservation.FcDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FcMapper {
    //주정비소 등록
    void saveFc(FcDto fcDto);

    //주 정비소 출력
    List<FcDto> findFavoriteCarcenterByMemberId(Long memberId);

    //주정비소 삭제
    Long deleteById(Long id);
}
