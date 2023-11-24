package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Member;
import kosa.afnica.backend.db.entity.Verification;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MemberMapper {

    // 회원 정보 저장
    void save(Member member);

//    void saveAdmin(Member member);

    // ID 기반으로 회원 정보 조회
    Optional<Member> findById(Long id);

    // 이메일 기반으로 회원 정보 조회
    Optional<Member> findByEmail(String email);

    String findRoleByEmail(String email);

    // 중복되는 이메일 조회
    int existByEmail(String email);

    // 중복되는 닉네임 조회
    int existByName(String name);

    // 회원 정보 수정
    void update(Member member);

    // 인증 번호 저장
    void saveCode(Verification verification);

    // 이메일 기반에 따른 인증 번호 조회
    String findCodeByEmail(String email);

    // 이메일 중복일 경우 인증 번호 갱신
    void updateCode(String veriEmail, String veriCode);

    // 중복되는 인증용 이메일 조회
    int existByVeriEmail(String veriEmail);

    //정비소 목록 출력
    List<Member> findCarcenterByRole();

    // Email 기반으로 ID 찾기
    Optional<Long> findIdByEmail(String email);

    // 회원탈퇴
    void delete(Member member);

    // 이메일 인증 후 테이블 삭제
    void deleteCode(String veriEmail, String veriCode);
}
