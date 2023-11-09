package kosa.afnica.backend.api.carcenter.controller;

import kosa.afnica.backend.api.carcenter.service.CarcenterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CarcenterController {

    private final CarcenterService carcenterService;

}
