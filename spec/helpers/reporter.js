'use strict';

const {DisplayProcessor, SpecReporter} = require('jasmine-spec-reporter');

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    customProcessors: [DisplayProcessor]
}));
