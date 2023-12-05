import core from '@actions/core';
import exec from '@actions/exec';

function run() {
    // Get some input values
    const bucketName = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // Upload files to AWS
    const s3Uri = `s3://${bucketName}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`
    core.setOutput('website-url', websiteUrl);
}

run();