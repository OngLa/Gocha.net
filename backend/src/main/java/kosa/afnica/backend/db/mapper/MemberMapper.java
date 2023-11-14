package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    public int insert(Member member);
    public int insertAdmin(Member member);
    public int update(Member member);
    public Member selectById(String id);
    public Member selectByEmail(String email);
    public String findRoleByEmail(String email);
}
