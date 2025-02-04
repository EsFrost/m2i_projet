"use client";
import React, { useState, useEffect } from "react";
import { requestTracker } from "../utils/requestTracker";

const RequestStats = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    lastMinuteRequests: 0,
    averageDuration: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      setStats({
        totalRequests: requestTracker.getRequestCount(),
        lastMinuteRequests: requestTracker.getLastMinuteRequests(),
        averageDuration: Math.round(requestTracker.getAverageRequestDuration()),
      });
    };

    // Update stats initially
    updateStats();

    // Set up listener for updates
    const removeListener = requestTracker.addListener(() => {
      updateStats();
    });

    // Update stats every second to keep "last minute" count accurate
    const interval = setInterval(updateStats, 1000);

    return () => {
      removeListener();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <h3 className="font-semibold mb-2">API Request Stats</h3>
      <div className="space-y-1 text-sm">
        <p>Total Requests: {stats.totalRequests}</p>
        <p>Last Minute: {stats.lastMinuteRequests}</p>
        <p>Avg Duration: {stats.averageDuration}ms</p>
      </div>
      <button
        onClick={() => requestTracker.clearRequests()}
        className="mt-2 text-xs text-indigo-600 hover:text-indigo-800"
      >
        Clear Stats
      </button>
    </div>
  );
};

export default RequestStats;
