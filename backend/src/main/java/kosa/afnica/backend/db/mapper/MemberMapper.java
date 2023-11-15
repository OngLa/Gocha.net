package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Member;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
    public int insert(Member member);
    public int insertAdmin(Member member);
    public int update(Member member);
    public Member selectById(Long id);
    public Member selectByEmail(String email); //로그인 시 Email에 대한 Member 계정정보 확인
    public String findRoleByEmail(String email); //FE에서 로그인한 멤버의 권한을 확인할 수 있도록 Role찾기
}
