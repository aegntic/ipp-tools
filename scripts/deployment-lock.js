/**
 * IPP.TOOLS Deployment Lock Mechanism
 * 
 * This module prevents recursive deployment loops by implementing a file-based
 * locking system that detects multiple deployment attempts for the same site.
 * 
 * The implementation uses a strategic detection algorithm to identify both:
 * 1. Parallel deployments of the same site
 * 2. Recursive deployment loops caused by script architecture
 */

const fs = require('fs');
const path = require('path');

// Configuration parameters for optimal lock performance
const LOCK_FILE = path.join(__dirname, '..', '.deployment.lock');
const MAX_LOCK_AGE = 5 * 60 * 1000; // 5 minutes (milliseconds)
const MIN_DEPLOYMENT_INTERVAL = 10 * 1000; // 10 seconds (milliseconds)

/**
 * Creates a deployment lock for a specific site
 * 
 * @param {string} site - The site being deployed (domain name)
 * @returns {boolean} True if lock was successfully created, false if deployment should be aborted
 */
function createDeploymentLock(site) {
  console.log(`🔒 Checking deployment lock for ${site}...`);
  
  if (!site) {
    console.warn('⚠️ No site specified for deployment lock');
    return true; // Allow deployment to proceed
  }
  
  // Check if lock file exists
  if (fs.existsSync(LOCK_FILE)) {
    try {
      // Read the existing lock
      const lockData = JSON.parse(fs.readFileSync(LOCK_FILE, 'utf8'));
      const currentTime = Date.now();
      const lockAge = currentTime - lockData.timestamp;
      
      // If lock is too old (from a failed previous deployment)
      if (lockAge > MAX_LOCK_AGE) {
        console.log('🔄 Stale deployment lock detected (likely from a failed build)');
        writeDeploymentLock(site);
        return true;
      }
      
      // If the same site is being deployed too quickly, this is likely a recursive loop
      if (lockData.site === site && lockAge < MIN_DEPLOYMENT_INTERVAL) {
        console.log(`⛔ RECURSIVE DEPLOYMENT DETECTED for ${site}`);
        console.log('🛑 Deployment aborted to prevent infinite loop');
        
        // Return false to abort deployment
        return false;
      }
      
      // Different site or enough time has passed
      writeDeploymentLock(site);
      return true;
      
    } catch (error) {
      console.warn('⚠️ Invalid lock file detected, creating new one');
      writeDeploymentLock(site);
      return true;
    }
  } else {
    // No lock exists, create one
    writeDeploymentLock(site);
    return true;
  }
}

/**
 * Writes the deployment lock file
 * 
 * @param {string} site - The site being deployed
 */
function writeDeploymentLock(site) {
  const lockData = {
    site: site,
    timestamp: Date.now(),
    pid: process.pid
  };
  
  try {
    fs.writeFileSync(LOCK_FILE, JSON.stringify(lockData, null, 2));
    console.log(`✅ Deployment lock created for ${site}`);
  } catch (error) {
    console.warn(`⚠️ Failed to create deployment lock: ${error.message}`);
  }
}

/**
 * Releases the deployment lock
 */
function releaseDeploymentLock() {
  if (fs.existsSync(LOCK_FILE)) {
    try {
      fs.unlinkSync(LOCK_FILE);
      console.log('🔓 Deployment lock released');
    } catch (error) {
      console.warn(`⚠️ Failed to release deployment lock: ${error.message}`);
    }
  }
}

module.exports = {
  createDeploymentLock,
  releaseDeploymentLock
};
