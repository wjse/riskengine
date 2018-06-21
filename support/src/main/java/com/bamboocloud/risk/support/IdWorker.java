package com.bamboocloud.risk.support;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.UUID;

public class IdWorker {

    private Logger logger = LoggerFactory.getLogger(IdWorker.class);
    private long workerId;
    private long dataCenterId;
    private long sequence = 0L;

    private long workerIdBits = 5L;
    private long dataCenterIdBits = 5L;
    private long maxWorkerId = -1L ^ (-1L << workerIdBits);
    private long maxDataCenterId = -1L ^ (-1L << dataCenterIdBits);
    private long sequenceBits = 12L;

    private long workerIdShift = sequenceBits;
    private long dataCenterIdShift = sequenceBits + workerIdBits;
    private long timestampLeftShift = sequenceBits + workerIdBits + dataCenterIdBits;
    private long sequenceMask = -1L ^ (-1L << sequenceBits);

    private long lastTimestamp = -1L;

    public IdWorker(){
        this(new BigDecimal(Math.random()).longValue(),new BigDecimal(Math.random()).longValue());
    }

    public IdWorker(long workerId, long dataCenterId) {
        // sanity check for workerId
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0", maxWorkerId));
        }
        if (dataCenterId > maxDataCenterId || dataCenterId < 0) {
            throw new IllegalArgumentException(String.format("datacenter Id can't be greater than %d or less than 0", maxDataCenterId));
        }
        this.workerId = workerId;
        this.dataCenterId = dataCenterId;
    }

    public synchronized long nextId() {
        long timestamp = timeGen();

        if (timestamp < lastTimestamp) {
            logger.error(String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - timestamp));
            return 0l;
        }

        if (lastTimestamp == timestamp) {
            sequence = (sequence + 1) & sequenceMask;
            if (sequence == 0) {
                timestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = timestamp;

        return (timestamp << timestampLeftShift) | (dataCenterId << dataCenterIdShift) | (workerId << workerIdShift) | sequence;
    }

    private static long timeGen() {
        return System.currentTimeMillis();
    }

    private long tilNextMillis(long lastTimestamp) {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }

    public static String uuid(){
        return UUID.randomUUID().toString().replace("-","");
    }
}
